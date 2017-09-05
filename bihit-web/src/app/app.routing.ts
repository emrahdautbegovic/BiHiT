import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { UserComponent } from './components/auth/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about.component';
import { ContactComponent } from './components/home/contact.component';
import { WelcomeComponent } from './components/home/welcome.component';
import { LoginComponent } from './components/auth/login.component';
import { PasswordComponent } from './components/auth/password.component';
import { ResetPasswordComponent } from './components/auth/resetPassword.component';
import { PageNotFoundComponent } from './components/pageNotFound.component';
import { DashboardComponent } from './components/loggedUser/dashboard.component';
import { DashboardHomeComponent } from './components/loggedUser/dashboardHome.component';
import { AdminLoginComponent } from './components/admin/adminLogin.component';
import { AdminDashboardComponent } from './components/admin/adminDashboard.component';
import { AdminCategoryComponent } from './components/admin/adminCategory.component';
import { CategoryComponent } from './components/loggedUser/category.component';
import { PostComponent } from './components/loggedUser/post.component';
import { SettingsComponent } from './components/loggedUser/settings.component';
import { QuestionsComponent } from './components/loggedUser/question.component';
import { PostDetailsComponent } from './components/loggedUser/postDetails.component';
import { SuggestionsComponent } from './components/loggedUser/suggestion.component';
import { AdminSuggestionsComponent } from './components/admin/adminSuggestion.component';
import { CategoryDetailsComponent } from './components/admin/categoryDetails.component';
import { QuestionDetailsComponent } from './components/loggedUser/questionDetails.component';
import { AdminQuestionsComponent } from './components/admin/adminQuestions.component';
import { AdminPostsComponent } from './components/admin/adminPosts.component';
import { AdminUsersComponent } from './components/admin/adminUsers.component';
import { AdminAnswersComponent } from './components/admin/adminAnswers.component';
import { AdminCommentsComponent } from './components/admin/adminComments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/welcome', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
     { path: '', component: WelcomeComponent },
     { path: 'welcome', component: WelcomeComponent },
     { path: 'registration', component: UserComponent },
     { path: 'about', component: AboutComponent },
     { path: 'contact', component: ContactComponent },
     { path: 'login', component: LoginComponent },
     { path: 'password', component: PasswordComponent },
     { path: 'reset_password', component: ResetPasswordComponent }
  ]},
  { path: 'emrahadminbihitupaesheomiph', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: DashboardHomeComponent },
    { path: 'home', component: DashboardHomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'questions/:id', component: QuestionDetailsComponent },
    { path: 'suggestions', component: SuggestionsComponent },
    { path: 'subcategory/:id', component: PostComponent },
    { path: 'post/:id', component: PostDetailsComponent }
  ]}, //, canActivate: [Angular2TokenService]
  { path: 'admin_dashboard', component: AdminDashboardComponent, children: [
    { path: '', component: AdminCategoryComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'category/:id', component: CategoryDetailsComponent },
    { path: 'suggestion', component: AdminSuggestionsComponent },
    { path: 'users', component: AdminUsersComponent },
    { path: 'posts', component: AdminPostsComponent },
    { path: 'questions', component: AdminQuestionsComponent },
    { path: 'answers', component: AdminAnswersComponent },
    { path: 'comments', component: AdminCommentsComponent }
  ]}, 
  { path: '**', component: PageNotFoundComponent  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


