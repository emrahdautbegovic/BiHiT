class SubcategoriesController < ApplicationController
  before_action :set_subcategory, only: [:show, :update, :destroy]
  before_action :authenticate_admin!
  # GET /subcategories
  # GET /subcategories.json
  def index
    @subcategories = Subcategory.where(nil)
    filtering_params(params).each do |key, value|
      @subcategories = @subcategories.public_send(key, value) if value.present?
    end
  end

  # GET /subcategories/1
  # GET /subcategories/1.json
  def show
  end

  # POST /subcategories
  # POST /subcategories.json
  def create
    @subcategory = Subcategory.new(subcategory_params)

    if @subcategory.save
      render :show, status: :created, location: @subcategory
    else
      render json: @subcategory.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /subcategories/1
  # PATCH/PUT /subcategories/1.json
  def update
    if @subcategory.update(subcategory_params)
      render :show, status: :ok, location: @subcategory
    else
      render json: @subcategory.errors, status: :unprocessable_entity
    end
  end

  # DELETE /subcategories/1
  # DELETE /subcategories/1.json
  def destroy
    @subcategory.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subcategory
      @subcategory = Subcategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subcategory_params
      params.require(:subcategory).permit(:title, :category_id)
    end

    def filtering_params(params)
      params.slice(:category_id)
    end
end
