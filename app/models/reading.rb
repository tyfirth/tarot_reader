class Reading < ApplicationRecord
  has_many :cards
  # accepts_nested_attributes_for :cards
end
