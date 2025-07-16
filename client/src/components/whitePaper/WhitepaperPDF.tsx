import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { WhitepaperData } from "@/types/whitepaper";
import wp2 from "@/assets/whitepaper/wp2.png";
// import icon from "@/assets/icons/mobile.png"; // optional icon

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
  },
  cover: {
    backgroundColor: "#e0f2fe",
    padding: 60,
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 20,
  },
  heroImage: {
    marginTop: 20,
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 10,
  },
  tocTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 16,
    borderBottom: "2 solid #3b82f6",
    paddingBottom: 6,
  },
  tocItem: {
    fontSize: 12,
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderLeft: "4 solid #3b82f6",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#1e293b",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    border: "1 solid #e2e8f0",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  headingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  sectionIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    margin: 0,
    padding: 0,
  },
  subHeading: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#334155",
    marginTop: 14,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 11,
    color: "#1e293b",
    marginBottom: 10,
    textAlign: "justify",
  },
  bullet: {
    fontSize: 11,
    marginLeft: 16,
    marginBottom: 6,
    paddingLeft: 6,
    borderLeft: "2 solid #cbd5e1",
    color: "#1e293b",
  },
  footer: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 40,
    textAlign: "center",
    borderTop: "1 solid #e5e7eb",
    paddingTop: 10,
  },
});

const WhitepaperPDF = ({ data }: { data: WhitepaperData }) => {
  return (
    <Document>

      {/* Cover Page */}
      <Page size="A4" style={[styles.page, styles.cover]}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
        <Image src={wp2} style={styles.heroImage} />
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.tocTitle}>Table of Contents</Text>
        {data.sections.map((section, i) => (
          <View key={i} style={styles.tocItem}>
            <Text>{`${i + 1}. ${section.heading}`}</Text>
            <Text>{`${i + 2}`.padStart(2, "0")}</Text>
          </View>
        ))}
      </Page>

      {/* Content Sections */}
      <Page size="A4" style={styles.page}>
        {data.sections.map((section, i) => (
          <View key={i} style={styles.sectionCard}>
            <View style={styles.headingRow}>
              {/* <Image src={icon} style={styles.sectionIcon} /> */}
              <Text style={styles.sectionHeading}>
                {`${i + 1}. ${section.heading}`}
              </Text>
            </View>

            {section.paragraphs?.map((para, pIdx) => (
              <Text key={pIdx} style={styles.paragraph}>{para}</Text>
            ))}

            {section.bullets?.map((b, bIdx) => (
              <Text key={bIdx} style={styles.bullet}>• {b}</Text>
            ))}

            {section.subSections?.map((sub, sIdx) => (
              <View key={sIdx}>
                {sub.subHeading && (
                  <Text style={styles.subHeading}>{sub.subHeading}</Text>
                )}
                {sub.paragraphs?.map((para, pIdx) => (
                  <Text key={pIdx} style={styles.paragraph}>{para}</Text>
                ))}
                {sub.bullets?.map((b, bIdx) => (
                  <Text key={bIdx} style={styles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ))}

        {data.footerText && <Text style={styles.footer}>{data.footerText}</Text>}
      </Page>
    </Document>
  );
};

export default WhitepaperPDF;
