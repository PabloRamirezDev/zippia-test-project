1. The website only needs one page, URL: /test/jobs

2. On this page, connect to an API service URL where you will get a json with a list of jobs:

    - POST https://www.zippia.com/api/jobs/

    {
        "companySkills": true,
        "dismissedListingHashes": [],
        "fetchJobDesc": true,
        "jobTitle": "Business Analyst",
        "loactions": [],
        "numJobs": 20,
        "previousListingHashes": []
    }

3. List the first 10 jobs with cards, there must be displayed:

    - jobTitle
    - companyName
    - shortDesc

4. Add a button that will offer to search the jobs by company names

5. Add a button that will display/filter only the jobs published in the last 7 days

6. Display the jobs as a list or as a carousel (slider)

7. Try to add some styles to the elements of the jobs

8. Try to make it responsive

9. Do SSR for the first screen

10. Try to add as many comments as you could explaining your code

11. Can use common frameworks as necessary

12. Should take no longer than 4 hours

13. Deploy to vercel

14. Design reference: https://www.zippia.com/developer-jobs/jobs/