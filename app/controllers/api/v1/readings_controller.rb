class Api::V1::ReadingsController < ApplicationController

  def index
    # binding.pry
    readings = Reading.all
    render json:  readings
  end

  def create
    # binding.pry
    reading = Reading.create(reading_params)
    reading.cards.build
    render json: reading
  end

  def destroy
    reading = Reading.find_by(id: params[:id]).destroy
    render json: readings
    # should ^ be @reading?
  end

  private

    def reading_params
      params.require(:reading).permit(
        # {card_ids: []},
        :notes,
        reading_cards: [],
        cards_attributes: [:name, :number, :type, :suit, :meaning_up, :desc, :reading_id]
      )
    end

end
