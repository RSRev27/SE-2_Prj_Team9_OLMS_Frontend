import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Grades = () => {
  const { courseId } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    average: 0,
    highest: 0,
    lowest: 100
  });

  useEffect(() => {
    fetchGrades();
  }, [courseId]);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      // Replace this URL with your actual API endpoint
      const response = await fetch(`/api/courses/${courseId}/grades`);
      if (!response.ok) {
        throw new Error('Failed to fetch grades');
      }
      const data = await response.json();
      setGrades(data);
      calculateStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (gradeData) => {
    if (gradeData.length === 0) return;

    const scores = gradeData.map(g => g.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max = Math.max(...scores);
    const min = Math.min(...scores);

    setStats({
      average: avg.toFixed(2),
      highest: max,
      lowest: min
    });
  };

  const getGradeColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading grades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-4 my-2">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Class Average</div>
              <div className="text-2xl font-bold">{stats.average}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Highest Grade</div>
              <div className="text-2xl font-bold text-green-600">{stats.highest}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Lowest Grade</div>
              <div className="text-2xl font-bold text-red-600">{stats.lowest}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{grade.title}</TableCell>
                  <TableCell>{new Date(grade.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${grade.status === 'Graded' ? 'bg-green-100 text-green-800' : 
                        grade.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {grade.status}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${getGradeColor(grade.score)}`}>
                    {grade.status === 'Graded' ? `${grade.score}%` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;