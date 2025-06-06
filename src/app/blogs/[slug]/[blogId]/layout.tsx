import Layout from "@/components/containers/layout/Layout";


export default function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="">{children}</div>
    </Layout>
  );
}
