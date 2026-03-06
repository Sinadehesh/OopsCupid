export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>This is a placeholder for the Terms of Service.</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}