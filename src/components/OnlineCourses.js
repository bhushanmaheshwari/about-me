export default function OnlineCourses({ data }) {
  return (
    <section className="max-w-5xl mx-auto px-4 mb-8 text-gray-700">
      <h2 className="font-bold text-xl mb-4">Online Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((course) => (
          <div key={course.title} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start">
            <div className="font-medium text-base mb-1">{course.title}</div>
            <div className="font-bold text-2xl">{course.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}