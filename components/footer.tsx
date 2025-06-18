import Link from "next/link"
import { Github, Mail, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Info */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">개발자 서경진 블로그</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              개발 경험과 기술적 인사이트를 공유하는 공간입니다. 지속적인 학습과 성장을 추구합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-black transition-colors text-sm">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Contact</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@example.com"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} 개발자 서경진 블로그. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
