<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.shipping.home.createOrEditLabel">Create or edit a Shipping</h2>
                <div>
                    <div class="form-group" v-if="shipping.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="shipping.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shipping-shippingDate">Shipping Date</label>
                        <div class="input-group">
                            <input id="shipping-shippingDate" type="date" class="form-control" name="shippingDate"  :class="{'valid': !$v.shipping.shippingDate.$invalid, 'invalid': $v.shipping.shippingDate.$invalid }"
                            v-model="$v.shipping.shippingDate.$model"  required />
                        </div>
                        <div v-if="$v.shipping.shippingDate.$anyDirty && $v.shipping.shippingDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shipping.shippingDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shipping-shift">Shift</label>
                        <select class="form-control" name="shift" :class="{'valid': !$v.shipping.shift.$invalid, 'invalid': $v.shipping.shift.$invalid }" v-model="$v.shipping.shift.$model" id="shipping-shift"  required>
                            <option value="A" >A</option>
                            <option value="B" >B</option>
                            <option value="C" >C</option>
                        </select>
                        <div v-if="$v.shipping.shift.$anyDirty && $v.shipping.shift.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shipping.shift.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shipping-noOfWagons">No Of Wagons</label>
                        <input type="number" class="form-control" name="noOfWagons" id="shipping-noOfWagons"
                            :class="{'valid': !$v.shipping.noOfWagons.$invalid, 'invalid': $v.shipping.noOfWagons.$invalid }" v-model.number="$v.shipping.noOfWagons.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shipping-noOfTrailers">No Of Trailers</label>
                        <input type="number" class="form-control" name="noOfTrailers" id="shipping-noOfTrailers"
                            :class="{'valid': !$v.shipping.noOfTrailers.$invalid, 'invalid': $v.shipping.noOfTrailers.$invalid }" v-model.number="$v.shipping.noOfTrailers.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shipping-shippedTonnage">Shipped Tonnage</label>
                        <input type="number" class="form-control" name="shippedTonnage" id="shipping-shippedTonnage"
                            :class="{'valid': !$v.shipping.shippedTonnage.$invalid, 'invalid': $v.shipping.shippedTonnage.$invalid }" v-model.number="$v.shipping.shippedTonnage.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="shipping-manager">Manager</label>
                        <select class="form-control" id="shipping-manager" name="manager" v-model="shipping.manager" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="shipping.manager && shiftManagerOption.id === shipping.manager.id ? shipping.manager : shiftManagerOption" v-for="shiftManagerOption in shiftManagers" :key="shiftManagerOption.id">{{shiftManagerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.shipping.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./shipping-update.component.ts">
</script>
