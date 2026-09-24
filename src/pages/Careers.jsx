import Icon from "../components/Icon";
import NumberedRows from "../components/NumberedRows";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import SectionHead from "../components/SectionHead";
import { CAREERS_EMAIL, OPEN_ROLES, PERKS } from "../data/careers";
import { PHOTOS } from "../data/photos";
import { CONTACT } from "../data/site";
import { COMPANY, TEAM_SIZE_LABEL } from "../data/stats";

const email = CAREERS_EMAIL ?? CONTACT.email;
const cvHref = `mailto:${email}?subject=${encodeURIComponent("Open application — Opus Geeks")}`;

// TODO(content): stock photos (credited in CREDITS.md), not our team. Replace
// with real photos of the Opus Geeks offices when available.
const GALLERY = [
  PHOTOS.careersWhiteboard,
  PHOTOS.careersTable,
  PHOTOS.careersOffice,
];

export default function Careers() {
  const hasRoles = OPEN_ROLES.length > 0;

  return (
    <div className="page-hero careers-page">
      <PageHeader
        eyebrow="Careers"
        title="Build products people rely on"
        subtitle={`Join ${TEAM_SIZE_LABEL} designers and engineers in ${COMPANY.cities.join(
          " and ",
        )} working on web, mobile and game projects.`}
      />

      <section className="section section-tight" aria-labelledby="perks-title">
        <div className="frame careers-why-grid">
          <div>
            <SectionHead
              layout="stacked"
              eyebrow="Why join us"
              title="Four reasons people join Opus Geeks"
              titleId="perks-title"
            />
            <NumberedRows
              items={PERKS.map((perk) => ({
                key: perk.title,
                title: perk.title,
                description: perk.detail,
              }))}
            />
          </div>
          <div className="photo-gallery careers-gallery">
            {GALLERY.map((photo, index) => (
              <figure
                className={`photo-tile ${index === 0 ? "is-wide" : ""}`}
                key={photo.id}
              >
                <Photo
                  photo={photo}
                  priority={index === 0}
                  width={index === 0 ? 560 : 280}
                  ratio={index === 0 ? 16 / 10 : 1}
                  sizes={
                    index === 0
                      ? "(max-width: 960px) calc(100vw - 36px), 560px"
                      : "(max-width: 960px) 46vw, 280px"
                  }
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-tight section-alt"
        aria-labelledby="roles-title"
      >
        <div className="frame roles-frame">
          <SectionHead
            eyebrow="Open roles"
            title="Current openings"
            titleId="roles-title"
          />

          {hasRoles ? (
            <NumberedRows
              ariaLabel="Open roles"
              items={OPEN_ROLES.map((role) => ({
                key: role.slug,
                title: role.title,
                description: `${role.team} · ${role.location} · ${role.type}`,
                href:
                  role.applyUrl ??
                  `mailto:${email}?subject=${encodeURIComponent(role.title)}`,
              }))}
            />
          ) : (
            <div className="roles-empty">
              <Icon name="users" />
              <h3>We&apos;re always meeting great people</h3>
              <p>
                We&apos;re always meeting great engineers and designers. Send
                your CV and portfolio, and we&apos;ll reach out when a role
                fits.
              </p>
              <a className="btn-gradient" href={cvHref}>
                Send your CV and portfolio{" "}
                <Icon name="arrowRight" className="icon-sm" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
