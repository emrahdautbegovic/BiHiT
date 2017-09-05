import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { Providers } from './app.providers';
import { UserComponent} from './components/auth/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about.component';
import { ContactComponent } from './components/home/contact.component';
import { LoginComponent } from './components/auth/login.component';
import { EqualValidator } from './directives/equal-validator.directive';
import { PageNotFoundComponent } from './components/pageNotFound.component';
import { PasswordComponent } from './components/auth/password.component';
import { ResetPasswordComponent } from './components/auth/resetPassword.component';
import {HttpClientModule} from '@angular/common/http';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { DashboardComponent } from './components/loggedUser/dashboard.component'
import { DashboardHomeComponent } from './components/loggedUser/dashboardHome.component';
import { AdminLoginComponent } from './components/admin/adminLogin.component';
import { AdminDashboardComponent } from './components/admin/adminDashboard.component';
import { WelcomeComponent } from './components/home/welcome.component';
import { AdminCategoryComponent } from './components/admin/adminCategory.component';
import { CategoryComponent } from './components/loggedUser/category.component';
import { PostComponent } from './components/loggedUser/post.component';
import { SettingsComponent } from './components/loggedUser/settings.component';
import { QuestionsComponent } from './components/loggedUser/question.component';
import { SuggestionsComponent } from './components/loggedUser/suggestion.component';
import { PostDetailsComponent } from './components/loggedUser/postDetails.component';
import { AdminSuggestionsComponent } from './components/admin/adminSuggestion.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryDetailsComponent } from './components/admin/categoryDetails.component';
import { QuestionDetailsComponent } from './components/loggedUser/questionDetails.component';
import { AdminUsersComponent } from './components/admin/adminUsers.component';
import { AdminPostsComponent } from './components/admin/adminPosts.component';
import { AdminQuestionsComponent } from './components/admin/adminQuestions.component';
import { AdminAnswersComponent } from './components/admin/adminAnswers.component';
import { AdminCommentsComponent } from './components/admin/adminComments.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    PageNotFoundComponent,
    EqualValidator,
    PasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    WelcomeComponent,
    AdminCategoryComponent,
    CategoryComponent,
    SettingsComponent,
    QuestionsComponent,
    SuggestionsComponent,
    AdminSuggestionsComponent,
    CategoryDetailsComponent,
    PostComponent,
    PostDetailsComponent,
    QuestionDetailsComponent,
    DashboardHomeComponent,
    AdminAnswersComponent,
    AdminPostsComponent,
    AdminQuestionsComponent,
    AdminUsersComponent,
    AdminCommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    A2tUiModule,
    NgxPaginationModule
  ],
  providers: Providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
