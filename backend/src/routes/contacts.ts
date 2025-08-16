import { Router } from 'express';
import { PrismaClient, Contact } from '@prisma/client';
import { encrypt, decrypt } from '../utils/encryption';
import { generateFakeContact } from '../utils/fakeData';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const router = Router();

/**
 * Helper: extract PII fields for encryption
 * @param body - The contact data containing PII fields
 * @returns An object with only the PII fields
 */
type ContactPII = {
	first_name: string;
	last_name: string;
	organisation: string;
	telephone: string;
	email: string;
	address_street: string;
	address_city: string;
};

function extractPII(body: ContactPII) {
	return {
		 first_name: body.first_name,
		 last_name: body.last_name,
		 organisation: body.organisation,
		 telephone: body.telephone,
		 email: body.email,
		 address_street: body.address_street,
		 address_city: body.address_city,
	};
}

// POST /contacts - create a contact
/**
 * POST /contacts - create a contact
 * Encrypts PII, generates fake data, and stores the contact
 */
router.post('/', async (req, res) => {
	try {
		const real = req.body;
		const pii = extractPII(real);
		const checkSum = encrypt(JSON.stringify(pii));
		const fake = generateFakeContact(real);
		const contact = await prisma.contact.create({
			data: {
				...fake,
				address_region: real.address_region,
				address_country: real.address_country,
				age_group: real.age_group,
				gender: real.gender,
				checkSum,
			},
		});
		res.status(201).json(contact);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to create contact' });
	}
});

// GET /contacts - list contacts (returns real data)
/**
 * GET /contacts - list contacts (returns real data)
 * Decrypts PII for each contact and returns the real data
 */
router.get('/', async (_req, res) => {
	try {
		const contacts = await prisma.contact.findMany();
	       const realContacts = contacts.map((c: Contact) => {
		       const pii = JSON.parse(decrypt(c.checkSum));
		       return {
			       ...pii,
			       address_region: c.address_region,
			       address_country: c.address_country,
			       age_group: c.age_group,
			       gender: c.gender,
			       id: c.id,
			       createdAt: c.createdAt,
			       updatedAt: c.updatedAt,
		       };
	       });
		res.json(realContacts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch contacts' });
	}
});

// PUT /contacts/:id - update a contact
/**
 * PUT /contacts/:id - update a contact
 * Updates real and fake data, ensures updatedAt is refreshed
 */
router.put('/:id', async (req, res) => {
	try {
		const real = req.body;
		const pii = extractPII(real);
		const checkSum = encrypt(JSON.stringify(pii));
		// Fetch existing contact to preserve fake data
		const existing = await prisma.contact.findUnique({ where: { id: req.params.id } });
		if (!existing) return res.status(404).json({ error: 'Contact not found' });

		// Only regenerate fake data for fields that have changed (except real fields)
		const fake = { ...existing };
		// If a real field changed, update the corresponding fake field if needed
		// (address_region, address_country, age_group, gender are real, not faked)
		// If a PII field changed, regenerate only that fake field
		if (real.first_name !== undefined && real.first_name !== JSON.parse(decrypt(existing.checkSum)).first_name) {
			fake.first_name = generateFakeContact(real).first_name;
		}
		if (real.last_name !== undefined && real.last_name !== JSON.parse(decrypt(existing.checkSum)).last_name) {
			fake.last_name = generateFakeContact(real).last_name;
		}
		if (real.organisation !== undefined && real.organisation !== JSON.parse(decrypt(existing.checkSum)).organisation) {
			fake.organisation = generateFakeContact(real).organisation;
		}
		if (real.telephone !== undefined && real.telephone !== JSON.parse(decrypt(existing.checkSum)).telephone) {
			fake.telephone = generateFakeContact(real).telephone;
		}
	       if (real.email !== undefined && real.email !== JSON.parse(decrypt(existing.checkSum)).email) {
		       // Regenerate fake email using existing fake first and last name
		       const { first_name, last_name } = fake;
		       fake.email = faker.internet.email({ firstName: first_name, lastName: last_name });
	       }
		if (real.address_street !== undefined && real.address_street !== JSON.parse(decrypt(existing.checkSum)).address_street) {
			fake.address_street = generateFakeContact(real).address_street;
		}
		if (real.address_city !== undefined && real.address_city !== JSON.parse(decrypt(existing.checkSum)).address_city) {
			fake.address_city = generateFakeContact(real).address_city;
		}

		// Always update real fields
		fake.address_region = real.address_region;
		fake.address_country = real.address_country;
		fake.age_group = real.age_group;
		fake.gender = real.gender;
		fake.checkSum = checkSum;

		// Always update updatedAt to now
		const contact = await prisma.contact.update({
			where: { id: req.params.id },
			data: {
				...fake,
				updatedAt: new Date(),
			},
		});
		res.json(contact);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to update contact' });
	}
});

// DELETE /contacts/:id - delete a contact
/**
 * DELETE /contacts/:id - delete a contact
 * Removes a contact from the database
 */
router.delete('/:id', async (req, res) => {
	try {
		await prisma.contact.delete({ where: { id: req.params.id } });
		res.status(204).end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to delete contact' });
	}
});

export default router;
