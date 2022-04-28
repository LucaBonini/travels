# Back-end Javascript/Typescript hiring test
## Description
Create a back-end application with a structure similar to WeRoad.  
This application should manage CRUD operation, travelers and simulate a backoffice workflow.

## Glossary
- Travel is the basic, fundamental unit of WeRoad: it contains all the necessary information, like the number of days, the images, title, what's included and everything about its appearance. An example is "Jordan 360°" or "Iceland: hunting for the Northern Lights";
- Tour is a specific dates-range of travel with its own price and details. "Jordan 360°" may have a tour from 20 to 27 January at €899, another one from 10 to 15 March at €1099 etc. At the end, in WeRoad, you will book a tour, not a travel.
- Travelers is a person that booked a specific tour.

## Goals

#### The back-end project should have:

1. A login endpoint to retrieve the user roles;
2. A private (admin) endpoint to create new users. If you want, this could be a DB seeder. This will mainly be used to generate users for this exercise;
3. A private (admin) endpoint to create new travelers. If you want, this could be a DB seeder. This will mainly be used to generate travelers for this exercise;
4. A private (admin) endpoint to create new travels;
5. A private (admin) endpoint to create new tours for travel;
6. A private (admin) endpoint to delete a travel;
7. A private (editor) endpoint to update a tour;
8. A public (no auth) endpoint to get a list of paginated travels.  
8.a Users can filter (search) the results by `slug`, `name`, `numberOfDays`.
8.b User can sort the list by `name` or `slug` ASC and DESC. By default if not specified the list will be ordered by `name` ASC.  
8.c This endpoint should provide a `tours` field that contains the tours related to the travel.
8.d The type Tour returned in the `tours` attribute (point 7.c) should also give access to the travelers list that booked that tour.  
9. (optional) An email should be sent to the travelers of tours that will depart within 5 days
9.1 A cron job should check the tours that will depart within 5 days and retrive the travelers email
9.2 After that should enqueue multiple async jobs in order to send the emails (feel free to use the technology you prefer for the async jobs and queues)
9.3 The async job must be mocked and simulate the email sending (e.g print to stdout)  

## Technology stack
- NestJs and idiomatic syntax  
- PostgreSQL as a relational database
- Automated tests  
- GraphQL endpoints  
- Usage of ORM  
- Good project setup with linter/formatter  

## Notes
- You should provide instructions on how to set up and start the project in local environment
- You are free to organize the project as you prefer, a good project organization is appreciated
- We use UUIDs as primary keys instead of incremental IDs, but it's not required for you to use them, although highly appreciated;
- **Tours prices** are integer multiplied by 100: for example, €999 euro will be `99900`, but, when returned to Frontends, they will be formatted (`99900 / 100`);
- **Tours names** inside the `samples` are a kind-of what we use internally, but you can use whatever you want;
- Every `admin` user will also have the `editor` permissions;
- In the `samples` folder you can find JSON files containing fake data to get started with;
- Feel free to add to the project whatever you want!

## Models

**Users**

- ID
- Email (unique)
- Password
- Roles (*Many-to-Many relationship*)

**Roles**

- ID
- Name

**Travels**

- ID
- Is Public (bool)
- Slug
- Name (unique)
- Description
- Number of days
- Number of nights (virtual, computed by `numberOfDays - 1`)
- Moods (see the samples to learn more)

**Tours**

- ID
- Travel ID (*Many-to-One relationship*)
- Name (unique)
- Starting date
- Ending date
- Price (integer, see above)
- Travelers (*Many-to-Many relationship*)

**Travelers**

- ID
- fullname
- email

