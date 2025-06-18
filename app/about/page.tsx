import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Coffee, BookOpen, Users } from "lucide-react"

export default function AboutPage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Git",
    "Docker",
    "AWS",
    "MongoDB",
  ]

  const experiences = [
    {
      title: "시니어 프론트엔드 개발자",
      company: "Tech Company",
      period: "2022 - 현재",
      description: "React와 Next.js를 활용한 웹 애플리케이션 개발 및 팀 리딩",
    },
    {
      title: "프론트엔드 개발자",
      company: "Startup Inc.",
      period: "2020 - 2022",
      description: "모바일 퍼스트 웹 애플리케이션 개발 및 성능 최적화",
    },
    {
      title: "주니어 개발자",
      company: "Dev Solutions",
      period: "2018 - 2020",
      description: "웹 개발 기초 학습 및 다양한 프로젝트 참여",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">About Me</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            안녕하세요! 프론트엔드 개발자 서경진입니다. 사용자 경험을 중시하며, 깔끔하고 효율적인 코드를 작성하는 것을
            좋아합니다.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">소개</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              5년차 프론트엔드 개발자로, 사용자 중심의 웹 애플리케이션을 개발하는 것에 열정을 가지고 있습니다. React와
              Next.js를 주력으로 사용하며, 최신 웹 기술 트렌드를 꾸준히 학습하고 적용하고 있습니다.
            </p>
            <p>
              단순히 기능을 구현하는 것을 넘어서, 사용자가 직관적으로 사용할 수 있는 인터페이스를 만드는 것을 중요하게
              생각합니다. 또한 팀워크를 중시하며, 지식 공유를 통해 함께 성장하는 것을 좋아합니다.
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black flex items-center">
              <Code className="mr-2 h-6 w-6" />
              기술 스택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-12 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              경력
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6 pb-6 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-black">{exp.title}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black flex items-center">
                <Coffee className="mr-2 h-5 w-5" />
                개발 철학
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="space-y-2">
                <li>• 사용자 경험을 최우선으로 생각</li>
                <li>• 깔끔하고 유지보수 가능한 코드 작성</li>
                <li>• 지속적인 학습과 개선</li>
                <li>• 성능과 접근성을 고려한 개발</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black flex items-center">
                <Users className="mr-2 h-5 w-5" />
                협업 스타일
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="space-y-2">
                <li>• 적극적인 커뮤니케이션</li>
                <li>• 지식 공유와 멘토링</li>
                <li>• 건설적인 코드 리뷰</li>
                <li>• 팀의 목표를 우선시</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
