export function LegalName() {
  return <span>{process.env.NEXT_PUBLIC_LEGAL_NAME}</span>;
}

export function LegalEmail() {
  return (
    <a href={`mailto:${process.env.NEXT_PUBLIC_LEGAL_EMAIL}`}>
      {process.env.NEXT_PUBLIC_LEGAL_EMAIL}
    </a>
  );
}

export function LegalAddress() {
  return (
    <>
      <span>{process.env.NEXT_PUBLIC_LEGAL_STREET}</span>
      <br />
      <span>{process.env.NEXT_PUBLIC_LEGAL_PLACE}</span>
      <br />
      <span>{process.env.NEXT_PUBLIC_LEGAL_COUNTRY}</span>
    </>
  );
}
