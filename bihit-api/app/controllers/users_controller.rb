class UsersController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_user, only: [:show, :update, :destroy]
  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def update
    @user.active = false
    @user.save
  end

  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end
