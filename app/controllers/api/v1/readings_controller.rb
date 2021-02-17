class Api::V1::ReadingsController < ApplicationController

  def index
    readings = Reading.all
    render json:  readings
  end

  def create
    reading = Reading.create(reading_params)
    render json: reading
  end

  private

    def reading_params
      params.require(:reading).permit(:notes, :timestamps)
    end
    # add card_attributes to params

end