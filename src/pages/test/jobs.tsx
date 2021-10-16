// ***************************************
// This is the main jobs page: /test/jobs
// ***************************************

// Imports

import { useState } from "react";

import type { NextPage, GetServerSideProps } from "next";
import type { Job } from "../../types";

import Layout from "../../components/Layout";
import JobCard from "../../components/JobCard";
import moment from "moment";
import Input from "../../components/Input";

// The page receives two props:
interface Props {
  jobs?: Job[]; // Fetched jobs in the server side
  error?: any; // Error ocurred when fetching jobs
}

const Jobs: NextPage<Props> = ({ jobs, error }) => {
  // Page state
  const [section, setSection] = useState(""); // Section displayed in page: "searchByCompany" | "last7Days" | ""
  const [companyQuery, setCompanyQuery] = useState(""); // Search string when section === "searchByCompany"

  // Filter the rendered jobs depending on the section
  const filterBySection = (job: Job) => {
    if (!section) {
      // When section is falsy (""), all jobs should be displayed
      return true;
    } else if (section === "searchByCompany") {
      // If searching by company, render only jobs that match the company name with the query string
      if (!companyQuery) {
        return true;
      } else {
        return job.companyName
          .toLowerCase()
          .includes(companyQuery.toLowerCase());
      }
    } else if (section === "last7Days") {
      // If looking for the last 7 days, render only jobs that were posted after 7 days ago
      return moment(job.OBJpostingDate).isSameOrAfter(
        moment().startOf("day").subtract(7, "days")
      );
    }
  };

  if (jobs) {
    // If jobs were fetched succesfully, render them
    return (
      <Layout
        section={section}
        onSectionSelect={(selected) =>
          selected === section ? setSection("") : setSection(selected)
        }
      >
        {section === "searchByCompany" && (
          <Input
            value={companyQuery}
            onChange={setCompanyQuery}
            label="Company Name"
          />
        )}
        {jobs.length > 0 ? (
          jobs
            .filter(filterBySection)
            .map((job) => (
              <JobCard
                key={`${job.companyName}-${job.jobTitle}`}
                title={job.jobTitle}
                description={job.shortDesc}
                companyName={job.companyName}
                companyLogo={job.companyLogo}
              />
            ))
            .splice(0, 10)
        ) : (
          <p>We didn&apos;t find any jobs :(</p>
        )}
      </Layout>
    );
  } else if (error) {
    // If there was an error, render a generic error message
    return <Layout error>Something happened</Layout>;
  } else {
    // This case shouldn't be reached
    return <Layout error>Unkown error</Layout>;
  }
};

// Fetch jobs before sending to client and pass them as props
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const jobs = await fetch("https://www.zippia.com/api/jobs/", {
      method: "POST",
      body: JSON.stringify({
        companySkills: true,
        dismissedListingHashes: [],
        fetchJobDesc: true,
        jobTitle: "Business  Analyst",
        locations: [],
        numJobs: 20,
        previousListingHashes: [],
      }),
      headers: [["Content-Type", "application/json"]],
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return json.jobs;
      })
      .catch((e) => {
        throw e;
      });

    return { props: { jobs } };
  } catch (error) {
    return { props: { error } };
  }
};

export default Jobs;
