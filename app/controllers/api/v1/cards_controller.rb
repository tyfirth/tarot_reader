class Api::V1::CardsController < ApplicationController

  def index
    cards = Card.all
    # render json: CardSerializer.new(card)
        render json: cards
  end

  def create
    # binding.pry
    card = Card.create(card_params)
    # render json: CardSerializer.new(card)
        render json: card
  end

  def show
    card = Card.find_by(id: params[:id])
    # render json: CardSerializer.new(card)
    render json: card

  end

  private

    def card_params
      params.require(:card).permit(:name, :number, :arcana, :suit, :meaning_up, :desc, :reading_id)
    end

end
