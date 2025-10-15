import React from "react";
import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = "Cenvia.id",
  url = "https://cenvia.vercel.app",
  logo = "https://cenvia.vercel.app/logo-cenvia.png",
  sameAs = [
    "https://www.facebook.com/cenvia.id",
    "https://twitter.com/cenvia_id",
    "https://www.instagram.com/cenvia.id",
  ],
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};

export default OrganizationSchema;
