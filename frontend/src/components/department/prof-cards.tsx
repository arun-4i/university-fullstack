import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 

interface Course {
  course_id: number;
  course_name: string;
}

interface ProfessorCardProps {
  professorName: string;
  courses: Course[];
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({
  professorName,
  courses,
}) => {
    return (
    //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{professorName}</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="text-lg">
              {courses.map((course) => (
                <li key={course.course_id}>{course.course_name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
    //   </div>
    );
};

export default ProfessorCard;
