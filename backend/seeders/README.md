# Database Seeders

This directory contains scripts to populate and manage demo/test data in the database.

## Available Scripts

### Seed Database

Populates the database with demo users and sample tasks:

```bash
npm run seed
```

This will:

- Clear existing users and tasks
- Create 4 demo users (1 admin + 3 employees)
- Create 8 sample tasks with different statuses

**Demo Credentials:**

- **Admin:** admin@example.com / admin123
- **Employee:** employee@example.com / employee123
- **John Doe:** john.doe@example.com / password123
- **Jane Smith:** jane.smith@example.com / password123

### Clear Database

Removes all data from the database:

```bash
npm run destroy
```

## Usage Tips

1. Make sure your `.env` file is configured with the correct `MONGODB_URI`
2. Ensure MongoDB is running before executing seeder scripts
3. Run `npm run seed` whenever you need fresh demo data
4. Run `npm run destroy` to clear the database before seeding again (already included in seed script)

## Seeder Data

### Users

- 1 Admin user
- 3 Employee users

### Tasks

- 8 sample tasks with various statuses:
  - Pending
  - In Progress
  - Completed

All tasks are assigned by the admin to different employees.
