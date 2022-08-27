class BuyersController < ApplicationController
  before_action :set_buyer, only: %i[ show edit update destroy ]

  # GET /buyers or /buyers.json
  def index
    @buyers = Buyer.all
  end

  # GET /buyers/1 or /buyers/1.json
  def show
  end

  # GET /buyers/new
  def new
    @buyer = Buyer.new
  end

  # GET /buyers/1/edit
  def edit
  end

  # POST /buyers or /buyers.json
  def create
    @buyer = Buyer.new(buyer_params)

    respond_to do |format|
      if @buyer.save
        format.html { redirect_to buyer_url(@buyer), notice: "Buyer was successfully created." }
        format.json { render :show, status: :created, location: @buyer }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @buyer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /buyers/1 or /buyers/1.json
  def update
    respond_to do |format|
      if @buyer.update(buyer_params)
        format.html { redirect_to buyer_url(@buyer), notice: "Buyer was successfully updated." }
        format.json { render :show, status: :ok, location: @buyer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @buyer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /buyers/1 or /buyers/1.json
  def destroy
    @buyer.destroy

    respond_to do |format|
      format.html { redirect_to buyers_url, notice: "Buyer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def last_buyer
    @last_buyer = Buyer.last.id 
    render json: { data: @last_buyer }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_buyer
      @buyer = Buyer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def buyer_params
      params.require(:buyer).permit(:name, :address, :email, :cellphone, :payment)
    end
end
