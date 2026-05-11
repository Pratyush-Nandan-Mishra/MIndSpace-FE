const StatsSection = () => {
  const stats = [
    { value: "75%", label: "Lorem ipsum" },
    { value: "4,000+", label: "Lorem ipsum" },
    { value: "50+", label: "Lorem ipsum" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
              {stat.value}
            </div>
            <p className="text-muted-foreground text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;