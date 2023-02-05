# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1

Facilities should be able to save custom ids for the Agents

`Acceptance Criteria`

- Facilities are able to add custom id to an Agent and they are able to use/view it in their system

`Implementation Details`

- Create a new table that maps the custom ids between Agents and Facilities.
- Make sure we still use our internal database id in our system i.e; the custom ids should only be used for display purposes.
- Update the Agent CRUD API(s)/services to account for sending custom id if facility field is mentioned.
- In the new table, (facilityId & customId) and (facilityId & AgentId) will be unique.

### Ticket 2

getShiftsByFacility function should be updated to return the Agents' custom ids for that facility

`Acceptance Criteria`

- getShiftsByFacility is returning the Agents' custom ids in the metadata for the Agents

`Implementation Details`

- If Agent Service is updated in the previous ticket, we should be receiving the Agents' custom ids already.
- If we are directly calling the DB in this function, we will need to make sure to query for the custom field as well.

### Ticket 3

Update the generateReport function to have an option for the Facilities to get reports based on either the internal database id or the custom id.

`Acceptance Criteria`

- generateReport is able to take either of the options mentioned above.
- generateReport is able to change the PDF to show either the internal database id or custom id depending on the input.
- generateReport is able to fallback on the internal database id, if the custom id for that Agent doesn't exist and the input option is `custom id`.
- generateReport is able to to account for the additional data to be displayed in the PDF in a well formatted manner.

`Implementation Details`

- Update the function definition to account for the new input.
- Change the seeding of the PDF to account for the option chosen in the input.
- Implement a fallback logic in case the custom id for a particular agent doesn't exist, so we default to the internal database id.
- Implement the new design for the PDF based on the Product/Design team
