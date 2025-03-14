import Layout from "@/components/containers/layout/Layout";

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
