import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import frLocale from "date-fns/locale/fr";

import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import CallOut from "@codegouvfr/react-dsfr/CallOut";

import styles from "./url.module.scss";
import { btoa, isToolEnabled } from "../utils";
import config from "@/config.json";
import Image from 'next/image';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const UrlHeader = ({
  report,
  url,
}: {
  report: UrlReport;
  url: string;
}) => {
  const lhrReports = Array.isArray(report.lhr) ? report.lhr : [report.lhr];
  const updateDate =
    lhrReports && lhrReports.length && lhrReports[0] && lhrReports[0].fetchTime;
  const title =
    config.urls &&
    config.urls.find(
      //@ts-ignore
      (url2) => url2.url === url && url2?.title
      //@ts-ignore
    )?.title;
  return (
    <div className={fr.cx("fr-mb-5w")} style={{ position: "relative" }}>
      <h1 className={fr.cx("fr-mb-2w")}>
        <a href={url} rel="noreferrer noopener" target="_blank">
          {url}
        </a>
      </h1>
      {report.betagouv?.attributes?.pitch && (
        <div>{report.betagouv?.attributes?.pitch}</div>
      )}
      {title && <div>{title}</div>}
      <div className={fr.cx("fr-mt-1w")}>
        {updateDate && (
          <Badge
            severity="warning"
            noIcon
            as="span"
            style={{ verticalAlign: "top", marginRight: 10 }}
          >
            <i
              className={fr.cx("fr-icon-time-fill", "fr-icon--sm", "fr-mr-1v")}
              title={`Mis à jour il y a ${formatDistanceToNow(
                new Date(updateDate),
                {
                  locale: frLocale,
                }
              )}`}
            />
            {formatDistanceToNow(new Date(updateDate), {
              locale: frLocale,
            })}
          </Badge>
        )}
        {report.category && (
          <Link
            href={`/category/${report.category}`}
            className="link-discreet"
            title={`Voir toutes les URLs de la catégorie ${report.category}`}
          >
            <Badge
              severity="success"
              style={{ verticalAlign: "top", marginRight: 10 }}
            >
              {report.category}
            </Badge>
          </Link>
        )}
        {report.tags &&
          report.tags.map((tag: string) => (
            <Link
              href={`/tag/${tag}`}
              key={tag}
              className="link-discreet"
              title={`Voir toutes les URLs du tag ${tag}`}
            >
              <Badge
                severity="info"
                style={{ verticalAlign: "top", marginRight: 10 }}
              >
                {tag}
              </Badge>
            </Link>
          ))}
        {report.betagouv?.id && (
          <Link
            href={`https://beta.gouv.fr/startups/${report.betagouv?.id}.html`}
            className="link-discreet"
            title={`Accéder à la fiche beta.gouv.fr de ${report.betagouv?.id}`}
          >
            <Badge
              severity="info"
              style={{ verticalAlign: "top", marginRight: 10 }}
            >
              fiche beta.gouv.fr
            </Badge>
          </Link>
        )}
      </div>
      {isToolEnabled("screenshot", report.url) && report.screenshot && (
        <Image
          className={styles.screenshotImg}
          alt={`Copie d'écran de ${url}`}
          src={`${BASE_PATH}/report/${btoa(url)}/screenshot.jpeg`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};
