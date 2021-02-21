class Api::V1::CardsController < ApplicationController

  def index
    @cards = Card.all
    render json: @cards
  end

  def create
    @card = Card.create(card_params)
    render json: @card
  end

  private

    def card_params
      params.require(:card).permit(:name, :number, :type, :suit, :meaning_up, :desc)
    end

end
