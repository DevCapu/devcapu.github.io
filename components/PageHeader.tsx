import Link from "next/link";

/**
 * Padrões de layout compartilhados por todas as rotas.
 * Toda página deve usar `pageContainerStyle` no wrapper externo e
 * `PageHeader` (ou `pageTitleStyle` em headers customizados) para que
 * margens e tipografia comecem e terminem no mesmo lugar em qualquer rota.
 */

export const pageContainerStyle: React.CSSProperties = {
  maxWidth: "820px",
  margin: "0 auto",
  padding: "64px 40px 88px",
};

export const pageTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "42px",
  lineHeight: 1.06,
  letterSpacing: "-0.03em",
  color: "#f4f4f3",
  margin: "0 0 10px",
};

export const pageSubtitleStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.6,
  color: "#9a9aa0",
  margin: 0,
  maxWidth: "560px",
};

export const kickerStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  color: "var(--accent)",
  marginBottom: "12px",
};

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "34px" }}>
      {kicker && (
        <div className="font-mono" style={kickerStyle}>
          {kicker}
        </div>
      )}
      <h1 className="font-grotesk" style={pageTitleStyle}>
        {title}
      </h1>
      {subtitle && (
        <p className="font-hanken" style={pageSubtitleStyle}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-mono"
      style={{
        fontSize: "11px",
        color: "#9a9aa0",
        textDecoration: "none",
        marginBottom: "32px",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}
