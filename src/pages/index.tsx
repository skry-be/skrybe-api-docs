import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/campaigns/create">
            Go to docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Skrybe API Documentation landing page">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.sdkSection}>
          <div className="container">
            <h2 className={styles.sdkHeading}>Official SDKs</h2>
            <div className={styles.sdkGrid}>
              <a
                href="https://www.npmjs.com/package/@skrybe/sdk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sdkCard}
                aria-label="TypeScript SDK on npm">
                <img
                  className={styles.sdkLogo}
                  src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/typescript.svg"
                  alt="TypeScript logo"
                />
                <span>TypeScript</span>
              </a>
              <a
                href="https://jitpack.io/#skry-be/skrybe-sdk-java"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sdkCard}
                aria-label="Java SDK on JitPack">
                <img
                  className={styles.sdkLogo}
                  src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/java.svg"
                  alt="Java logo"
                />
                <span>Java</span>
              </a>
              <a
                href="https://pypi.org/project/skrybe-sdk/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sdkCard}
                aria-label="Python SDK on PyPI">
                <img
                  className={styles.sdkLogo}
                  src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/python.svg"
                  alt="Python logo"
                />
                <span>Python</span>
              </a>
              <a
                href="http://packagist.org/packages/skrybe/sdk-php"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sdkCard}
                aria-label="PHP SDK on Packagist">
                <img
                  className={styles.sdkLogo}
                  src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/php.svg"
                  alt="PHP logo"
                />
                <span>PHP</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
