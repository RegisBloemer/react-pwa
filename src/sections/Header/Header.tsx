import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { repository, title } from '@/config';
import useHotKeysDialog from '@/store/hotkeys';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

function Header() {
  const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();
  const [, notificationsActions] = useNotifications();
  const [, hotKeysDialogActions] = useHotKeysDialog();

  function showNotification() {
    notificationsActions.push({
      options: {
        // Show fully customized notification
        // Usually, to show a notification, you'll use something like this:
        // notificationsActions.push({ message: ... })
        // `message` accepts string as well as ReactNode
        // But you also can use:
        // notificationsActions.push({ options: { content: ... } })
        // to show fully customized notification
        content: (
          <Alert severity="info">
            <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
            {getRandomJoke()}
          </Alert>
        ),
      },
    });
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-2 link-light">
              Home
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <a href="/login">
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
          </a>

          <a href="/register">
            <button type="button" className="btn btn-primary">
              Sign-up
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
