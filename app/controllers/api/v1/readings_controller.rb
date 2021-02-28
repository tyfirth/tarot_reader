class Api::V1::ReadingsController < ApplicationController

  def index
    # binding.pry
    readings = Reading.all
    # options = {
    #   include: [:cards]
    # }
    # render json:  ReadingSerializer.new(readings, options)
    render json: readings
  end

  def create
    # binding.pry
    reading = Reading.create(reading_params)
    # render json: ReadingSerializer.new(reading, options)
        render json: reading
  end

  def destroy
    reading = Reading.find_by(id: params[:id]).destroy
    # render json: ReadingSerializer.new(readings, options)
      render json: readings
    # should ^ be @reading?
  end

  private

    def reading_params
      params.require(:reading).permit(
        :notes,
        # reading_cards: [],
        {cards_attributes: [:id, :name, :number, :type, :suit, :meaning_up, :desc, :reading_id]},
        {card_ids: []}
      )
    end

end
