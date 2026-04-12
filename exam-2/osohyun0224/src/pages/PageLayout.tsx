import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from './routes.constants';

export function PageLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <NavLink to={ROUTES.HOME} className="app-logo">
          회의실 예약 시스템
        </NavLink>
        <nav className="app-nav">
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            타임라인
          </NavLink>
          <NavLink
            to={ROUTES.BOOKING}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            예약 생성
          </NavLink>
          <NavLink
            to={ROUTES.MY_RESERVATIONS}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            내 예약
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
