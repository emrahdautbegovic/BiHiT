class UserSuggestionsController < ApplicationController
  before_action :set_suggestion, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  # GET /suggestions
  # GET /suggestions.json
  def index
    @suggestions = Suggestion.all.order(created_at: :desc)
  end

  # GET /suggestions/1
  # GET /suggestions/1.json
  def show
  end

  # POST /suggestions
  # POST /suggestions.json
  def create
    @suggestion = Suggestion.new(suggestion_params)

    if @suggestion.save
      render :show, status: :created, location: @suggestion
    else
      render json: @suggestion.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /suggestions/1
  # PATCH/PUT /suggestions/1.json
  def update
    if @suggestion.update(suggestion_params)
      render :show, status: :ok, location: @suggestion
    else
      render json: @suggestion.errors, status: :unprocessable_entity
    end
  end

  # DELETE /suggestions/1
  # DELETE /suggestions/1.json
  def destroy
    @suggestion.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_suggestion
      @suggestion = Suggestion.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def suggestion_params
      params.require(:user_suggestion).permit(:title).merge(email: current_user.uid, user_id: current_user.id)
    end
end
