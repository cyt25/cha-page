export default function TestLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        ProgressRoute's Layout Component (header)
        {children}
      </div>
    )
  }
  