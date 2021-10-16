import React from "react";

import styles from "../styles/components/Layout.module.css";

interface Props {
  onSectionSelect?: (section: string) => void;
  section?: string;
  error?: boolean;
}

// Base layout containing a header and a footer
const Layout: React.FC<Props> = ({
  children,
  section,
  onSectionSelect,
  error,
}) => {
  return (
    <div className={styles.container}>
      {!error && (
        <header className={styles.header}>
          <h1>Jobs</h1>
          <ul className={styles.nav}>
            <li>
              <a
                onClick={() => onSectionSelect?.("searchByCompany")}
                className={`${styles.navLink} ${
                  section === "searchByCompany" && styles.selected
                }`}
              >
                Search by Company
              </a>
            </li>
            <li>
              <a
                onClick={() => onSectionSelect?.("last7Days")}
                className={`${styles.navLink} ${
                  section === "last7Days" && styles.selected
                }`}
              >
                Last 7 days
              </a>
            </li>
          </ul>
        </header>
      )}
      <section className={styles.content}>{children}</section>
      {!error && (
        <footer className={styles.footer}>
          <a
            className={styles.footerLink}
            href="https://github.com/PabloRamirezDev"
          >
            Created by Pablo Ramírez
          </a>
        </footer>
      )}
    </div>
  );
};

export default Layout;
