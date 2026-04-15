import { delay, HttpResponse, http } from 'msw';
import {
  getMockControls,
  getStoredLevels,
  getStoredMembers,
  getStoredProblemTypes,
  getStoredProficiency,
  initializeMockStorage,
} from './storage';

/**
 * 간헐적으로 긴 지연(~5초)이 발생합니다.
 * 약 15%의 확률로 1.5~5초, 나머지는 300~800ms
 */
function randomDelay(): number {
  const controls = getMockControls();

  if (controls.forceDelay) {
    return 4000;
  }

  if (Math.random() < 0.15) {
    return Math.random() * 3500 + 1500;
  }
  return Math.random() * 500 + 300;
}

/**
 * 약 10%의 확률로 에러를 반환합니다.
 * 500 또는 503 상태 코드를 무작위로 선택합니다.
 */
function maybeError(): Response | null {
  const controls = getMockControls();

  if (controls.forceError) {
    return HttpResponse.json(
      {
        error: 'Internal Server Error',
        message: '개발자 도구 패널에서 강제 에러가 활성화되었습니다.',
      },
      { status: 500 },
    );
  }

  if (Math.random() < 0.1) {
    const status = Math.random() < 0.5 ? 500 : 503;
    return HttpResponse.json(
      {
        error:
          status === 500
            ? 'Internal Server Error'
            : 'Service Temporarily Unavailable',
        message:
          status === 500
            ? '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            : '서버가 일시적으로 과부하 상태입니다. 잠시 후 다시 시도해주세요.',
      },
      { status },
    );
  }
  return null;
}

export const handlers = [
  http.get('/api/members', async () => {
    initializeMockStorage();
    await delay(randomDelay());

    const errorResponse = maybeError();
    if (errorResponse) return errorResponse;

    const members = getStoredMembers();
    return HttpResponse.json(members);
  }),

  http.get('/api/levels', async () => {
    initializeMockStorage();
    await delay(randomDelay());

    const errorResponse = maybeError();
    if (errorResponse) return errorResponse;

    const levels = getStoredLevels();
    return HttpResponse.json(levels);
  }),

  http.get('/api/problem-types', async ({ request }: { request: Request }) => {
    initializeMockStorage();
    await delay(randomDelay());

    const errorResponse = maybeError();
    if (errorResponse) return errorResponse;

    const url = new URL(request.url);
    const levelKey = url.searchParams.get('levelKey');
    const problemTypes = getStoredProblemTypes();

    if (!levelKey || !(levelKey in problemTypes)) {
      return HttpResponse.json([], { status: 200 });
    }

    return HttpResponse.json(problemTypes[levelKey]);
  }),

  http.get('/api/proficiency', async ({ request }: { request: Request }) => {
    initializeMockStorage();
    await delay(randomDelay());

    const errorResponse = maybeError();
    if (errorResponse) return errorResponse;

    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');
    const levelKey = url.searchParams.get('levelKey');

    if (!memberId || !levelKey) {
      return HttpResponse.json([], { status: 200 });
    }

    const key = `${memberId}_${levelKey}`;
    const proficiency = getStoredProficiency();
    const data = proficiency[key] ?? [];

    return HttpResponse.json(data);
  }),
];
