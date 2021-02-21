class Api::V1::ReadingsController < ApplicationController

  def index
    @readings = Reading.all
    render json:  @readings
  end

  def create
    @reading = Reading.create(reading_params)
    render json: @reading
  end

  def destroy
    @reading = Reading.find_by(id: params[:id]).destroy
    render json: @readings
    # should ^ be @reading?
  end

  private

    def reading_params
      params.require(:reading).permit(:notes, :timestamps, {cards_attributes: [:name, :value_int, :type, :suit, :meaning_up, :desc]})
    end
    # add cards_attributes to params

end
