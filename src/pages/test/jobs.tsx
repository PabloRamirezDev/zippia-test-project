import { useState } from "react";

import type { NextPage, GetServerSideProps } from "next";
import type { Job } from "../../types";

import Layout from "../../components/Layout";
import JobCard from "../../components/JobCard";
import moment from "moment";
import Input from "../../components/Input";

interface Props {
  jobs?: Job[];
  error?: any;
}

const Jobs: NextPage<Props> = ({ jobs, error }) => {
  const [companyQuery, setCompanyQuery] = useState("");
  const [section, setSection] = useState("");

  const filterBySection = (job: Job) => {
    if (!section) {
      return true;
    } else if (section === "searchByCompany") {
      if (!companyQuery) {
        return true;
      } else {
        return job.companyName
          .toLowerCase()
          .includes(companyQuery.toLowerCase());
      }
    } else if (section === "last7Days") {
      return moment(job.OBJpostingDate).isSameOrAfter(
        moment().startOf("day").subtract(7, "days")
      );
    }
  };

  if (jobs) {
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
    return <Layout>Something happened</Layout>;
  } else {
    return <Layout>Unkown error</Layout>;
  }
};

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
