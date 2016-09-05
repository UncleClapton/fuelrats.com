import Route from './Route'

import AboutRoute from 'routes/About'
import BlogListRoute from 'routes/BlogList'
import BlogRoute from 'routes/Blog'
import HomeRoute from 'routes/Home'
import LeaderboardRoute from 'routes/Leaderboard'
import LoginRoute from 'routes/Login'
import TweeterRoute from 'routes/Tweeter'





export default {
  routes: {
    'about(/)': new AboutRoute,
    'blog/:id(/)': new BlogRoute,
    'blog(/)': new BlogListRoute,
    'home(/)': new HomeRoute,
    'leaderboard(/)': new LeaderboardRoute,
    'login(/)': new LoginRoute,
    'tweeter(/)': new TweeterRoute,
    '*notfound': new HomeRoute
  }
}
