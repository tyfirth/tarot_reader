class Api::V1::ReadingsController < ApplicationController

  def index
    # binding.pry
    readings = Reading.all
    # options = {
    #   include: [:cards]
    # }
    # render json:  ReadingSerializer.new(readings, options)
    render json: readings.to_json(:include => {
      :cards => {:only => [:name, :suit, :number, :arcana, :desc, :meaning_up]}
      },
    :except => [:updated_at])
  end

  def create
    # binding.pry
    reading = Reading.create(reading_params)
    # render json: ReadingSerializer.new(reading, options)
        render json: reading.to_json(:include => {
          :cards => {:only => [:name, :suit, :number, :arcana, :desc, :meaning_up]}
          },
        :except => [:updated_at])
  end

  def show
    # binding.pry
    reading = Reading.find_by(id: params[:id])
    # render json: ReadingSerializer.new(reading, options)

    # render json: reading
  end

  def destroy
    reading = Reading.find_by(id: params[:id]).destroy
    # render json: ReadingSerializer.new(readings, options)
      # render json: reading
    # should ^ be @reading?
  end

  private

    def reading_params
      params.require(:reading).permit(:notes)
    end

end
