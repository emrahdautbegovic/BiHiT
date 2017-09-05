class UserCategoriesController < ApplicationController
  before_action :authenticate_user!
 
  def index
    @categories = Category.all
    render json: @categories
  end
end
