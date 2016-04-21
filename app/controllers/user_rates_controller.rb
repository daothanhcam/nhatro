class UserRatesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_address
  before_action :find_user_rate, except: :create
  respond_to :js

  # def new
  #   @user_rate = @address.user_rates.build user_rate_params
  #   @user_rate.user = current_user
  # end

  def create
    @user_rate = @address.user_rates.where(user_id: current_user.id).first_or_initialize
    @user_rate.assign_attributes user_rate_params
    respond_to do |format|
      if @user_rate.save
        format.json do
          render json: {point: @user_rate.point, status: 200}
        end
      else
        format.json do
          render json: {status: 400}
        end
      end
    end
  end

  # def update
  #   @review.update_attributes user_rate_params
  # end

  private
  def user_rate_params
    params.require(:user_rate).permit :point
  end

  def find_address
    @address = Address.find params[:address_id]
  end

  def find_user_rate
    @user_rate = @address.user_rates.find params[:id]
  end
end
