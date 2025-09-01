
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";

interface Contact {
  id?: string;
  first_name: string;
  last_name: string;
  organisation: string;
  telephone: string;
  email: string;
  address_street: string;
  address_city: string;
  address_region: string;
  address_country: string;
  age_group: string;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

const emptyContact: Contact = {
  first_name: "",
  last_name: "",
  organisation: "",
  telephone: "",
  email: "",
  address_street: "",
  address_city: "",
  address_region: "",
  address_country: "",
  age_group: "",
  gender: "",
};

export default function Home() {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Contact>(emptyContact);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'first_name' | 'last_name'>('first_name');


  // API base URLs from env
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const demoApiBaseUrl = process.env.NEXT_PUBLIC_DEMO_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function fetchContacts() {
    const res = await axios.get(`${apiBaseUrl}/contacts`);
    setContacts(res.data);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${apiBaseUrl}/contacts/${editingId}`, form);
    } else {
      await axios.post(`${apiBaseUrl}/contacts`, form);
    }
    setForm(emptyContact);
    setEditingId(null);
    fetchContacts();
  }

  function handleSelect(contact: Contact) {
    setSelectedId(contact.id || null);
    setForm(contact);
    setEditingId(null);
    setViewMode(true);
  }

  function handleAddNew() {
    setForm(emptyContact);
    setEditingId(null);
    setSelectedId(null);
    setViewMode(false);
  }


  async function handleDelete(id: string) {
    await axios.delete(`${apiBaseUrl}/contacts/${id}`);
    setViewMode(false);
    fetchContacts();
  }

  // Sort contacts by selected field
  const sortedContacts = [...contacts].sort((a, b) => {
    const aVal = a[sortBy]?.toLowerCase() || '';
    const bVal = b[sortBy]?.toLowerCase() || '';
    return aVal.localeCompare(bVal);
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Chameleon Contacts
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, pr: 1 }}>
          <img
            src="/chameleon_logo_colour.svg"
            alt="Chameleon Logo"
            width={72}
            height={60}
            style={{ filter: 'brightness(0.7) grayscale(0.2)', opacity: 0.85, borderRadius: 0, background: 'none' }}
          />
        </Box>
      </Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 500 }}>
          {/* Left column: Contact list */}
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, borderRight: { md: '1px solid #eee' }, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, pb: 0 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Contacts</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddNew}
                  sx={{
                    borderRadius: 99,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    py: 0.5,
                    boxShadow: 0,
                  }}
                  color="primary"
                  disabled={editingId === null && selectedId === null}
                >
                  Add New
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 99, textTransform: 'none', fontWeight: 500 }}
                  onClick={() => setSortBy(sortBy === 'first_name' ? 'last_name' : 'first_name')}
                >
                  Sort by {sortBy === 'first_name' ? 'Last Name' : 'First Name'}
                </Button>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List sx={{ flex: 1, overflowY: 'auto' }}>
              {sortedContacts.map((c) => (
                <ListItem key={c.id} disablePadding>
                  <ListItemButton
                    selected={selectedId === c.id}
                    onClick={() => handleSelect(c)}
                  >
                    <ListItemText primary={`${c.first_name} ${c.last_name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
              {contacts.length === 0 && (
                <ListItem>
                  <ListItemText primary="No contacts found." />
                </ListItem>
              )}
            </List>
          </Box>
          {/* Right column: Details & form */}
          <Box sx={{ width: { xs: '100%', md: '66.66%' }, p: 3 }}>
            {/* View Mode */}
            {selectedId && viewMode && (
              <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Typography variant="h6">Contact Details</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    href={`${demoApiBaseUrl}/contact/${selectedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 99, textTransform: 'none', fontWeight: 500 }}
                  >
                    View Raw (Demo API)
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: 99, textTransform: 'none', fontWeight: 500 }}
                    onClick={() => { setEditingId(selectedId); setViewMode(false); }}
                  >
                    Edit
                  </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography><b>First Name:</b> {form.first_name}</Typography>
                  <Typography><b>Last Name:</b> {form.last_name}</Typography>
                  <Typography><b>Organisation:</b> {form.organisation}</Typography>
                  <Typography><b>Telephone:</b> {form.telephone}</Typography>
                  <Typography><b>Email:</b> {form.email}</Typography>
                  <Typography><b>Street:</b> {form.address_street}</Typography>
                  <Typography><b>City:</b> {form.address_city}</Typography>
                  <Typography><b>Region:</b> {form.address_region}</Typography>
                  <Typography><b>Country:</b> {form.address_country}</Typography>
                  <Typography><b>Age Group:</b> {form.age_group}</Typography>
                  <Typography><b>Gender:</b> {form.gender}</Typography>
                </Box>
                <Button type="button" onClick={handleAddNew} color="inherit">
                  Close
                </Button>
              </React.Fragment>
            )}
            {/* Edit/Add Mode */}
            {(!selectedId || editingId) && (
              <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Typography variant="h6">{editingId ? 'Edit Contact' : 'Add New Contact'}</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField name="first_name" label="First Name" value={form.first_name} onChange={handleChange} required fullWidth />
                      <TextField name="last_name" label="Last Name" value={form.last_name} onChange={handleChange} required fullWidth />
                    </Stack>
                    <TextField name="organisation" label="Organisation" value={form.organisation} onChange={handleChange} fullWidth />
                    <TextField name="telephone" label="Telephone" value={form.telephone} onChange={handleChange} fullWidth />
                    <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth />
                    <TextField name="address_street" label="Street" value={form.address_street} onChange={handleChange} fullWidth />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField name="address_city" label="City" value={form.address_city} onChange={handleChange} fullWidth />
                      <TextField name="address_region" label="Region" value={form.address_region} onChange={handleChange} required fullWidth />
                      <TextField name="address_country" label="Country" value={form.address_country} onChange={handleChange} required fullWidth />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField name="age_group" label="Age Group" value={form.age_group} onChange={handleChange} select required fullWidth>
                        <MenuItem value="">Age Group</MenuItem>
                        <MenuItem value="child">Child</MenuItem>
                        <MenuItem value="teen">Teen</MenuItem>
                        <MenuItem value="adult">Adult</MenuItem>
                        <MenuItem value="senior">Senior</MenuItem>
                      </TextField>
                      <TextField name="gender" label="Gender" value={form.gender} onChange={handleChange} select required fullWidth>
                        <MenuItem value="">Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                        <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                      </TextField>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={editingId !== null}
                      >
                        Add Contact
                      </Button>
                      {editingId && (
                        <Button type="submit" variant="contained" color="primary">
                          Update
                        </Button>
                      )}
                      {(editingId || selectedId) && (
                        <Button type="button" onClick={handleAddNew} color="inherit">
                          Cancel
                        </Button>
                      )}
                      {editingId && selectedId && (
                        <Button type="button" color="error" onClick={() => selectedId && handleDelete(selectedId)}>
                          Delete
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

