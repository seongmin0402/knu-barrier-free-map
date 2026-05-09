'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [buildings] = useState([
    {
      id: 'building-1',
      name: '인문사회과학대학관',
      wheelchair: true,
      elevator: true,
      toilet: true,
      parking: 4,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-sm text-gray-600 mt-1">건물 정보를 관리합니다</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">건물 목록</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + 건물 추가
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    건물명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시설
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buildings.map((building) => (
                  <tr key={building.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{building.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {building.wheelchair && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            휠체어
                          </span>
                        )}
                        {building.elevator && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            엘리베이터
                          </span>
                        )}
                        {building.toilet && (
                          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                            화장실
                          </span>
                        )}
                        {building.parking > 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                            주차 {building.parking}대
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">수정</button>
                      <button className="text-red-600 hover:text-red-900">삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Firebase 설정 필요</h3>
          <p className="text-sm text-blue-800 mb-4">
            관리자 기능을 사용하려면 Firebase 프로젝트를 설정하고 .env.local 파일에 API 키를 추가해야 합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Firebase Console에서 새 프로젝트 생성</li>
            <li>Authentication, Firestore, Storage 활성화</li>
            <li>웹 앱 등록 및 구성 정보 복사</li>
            <li>.env.local 파일에 Firebase 설정 추가</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
