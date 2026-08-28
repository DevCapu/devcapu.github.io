"use client";

export default function AdminPage() {
  return (
    <iframe
      src="/admin/index.html"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 99999,
      }}
    />
  );
}
