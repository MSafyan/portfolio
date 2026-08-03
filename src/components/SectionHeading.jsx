import { styles } from "../styles";

/**
 * Single source of truth for section headers.
 *
 * Every section used to hand-roll its own, which had drifted into three eyebrow
 * colours (secondary / accent / accent-light), two alignments, a hardcoded
 * 36px heading in Tech, a missing accent period in Projects, and an <h3> in
 * Contact that broke the heading outline. Route all of them through here.
 */
const SectionHeading = ({ eyebrow, title, as: Tag = "h2" }) => (
  <>
    <p className={styles.sectionSubText}>/// {eyebrow}</p>
    <Tag className={styles.sectionHeadText}>
      {title}
      <span className="text-accent">.</span>
    </Tag>
  </>
);

export default SectionHeading;
