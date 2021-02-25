class Api::V1::ReadingsController < ApplicationController

  def index
    # binding.pry
    readings = Reading.all
    render json:  readings
  end

  def create
    binding.pry

    # # or
    # @card = Card.find_or_create_by(name: reading_params[:cards][:card_name].value)

    reading = Reading.create(reading_params)
    # reading_params[:cards].each do |card|
    #   binding.pry
    #  card.reading_id = self.id
    #   self.cards << card
    # end

    # @reading.cards.build
  # THis was it ^^^^^^ partly
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
        cards: [:id, :name, :number, :suit, :reading_id]
      )
    end
    #  This expects an instance but receives an object

    # def reading_params
    #   params.require(:reading).permit(
    #     :notes,
    #     :timestamps,
    #     {cards_attributes: [:id, :name, :suit, :type, :value_int, :desc, :meaning_up, :reading_id]},
    #     {card_ids: []}
    #   )
    # end

end
