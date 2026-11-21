import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="label">404</p>
      <h1 className="font-display mt-3 text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        That route does not exist. Return to the homepage to continue.
      </p>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </Container>
  );
}
