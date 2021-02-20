class Api::V1::CardsController < ApplicationController

  def index
    cards = Card.all
  end

  def create
    card = Card.create(card_params)
  end

  private

    def card_params
      params.require(:card).permit(:name, :number, :type, :suit, :meaning_up, :desc)
    end

end
