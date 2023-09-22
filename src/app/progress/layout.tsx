export default function TestLayout({
    children,
  }: {
    children: React.ReactNode
  }): React.ReactNode {
    return (
      <div>
        ProgressRoute&aposs Layout Component (header)
        {children}
      </div>
    );
  }
  